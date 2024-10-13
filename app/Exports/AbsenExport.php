<?php

namespace App\Exports;

use App\Models\Anak;
use App\Models\Kelompok;
use App\Models\Absen;
use App\Models\AbsenDetail;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use PhpOffice\PhpSpreadsheet\Cell\Coordinate;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
class AbsenExport implements FromCollection, WithHeadings, WithMapping, 
WithEvents, WithStyles, WithTitle, WithCustomStartCell
{    
    protected $headingLength;
    private $rowNumber = 0;
    public function __construct($kelompok, $tgl)
    {
        $this->kelompok = $kelompok;
        $this->tgl = $tgl;
        $this->headingLength = count($this->headings());
    }

    public function collection()
    {
        return Anak::with('kelompok')
        ->when($this->kelompok, function($query, $kelompok){
            return $query->whereHas('kelompok', function($q) use($kelompok){
                return $q->where('id', $kelompok);
            });
        })
        ->orderBy('id', 'DESC')->get();
    }

    public function startCell(): string
    {
        return 'A7';
    }

    public function headings(): array
    {
        $days = [];
        $headings =  [
            'No',
            'Nama',
            'L/P',
        ];

        $start = Carbon::parse($this->tgl)->startOfMonth();
        $end = Carbon::parse($this->tgl)->lastOfMonth();
        $periode = CarbonPeriod::create($start, $end);
        foreach($periode as $p)
        {
            $headings[] = $p->format('d');
        }

        // $headings[] = 'H';
        // $headings[] = 'I';
        // $headings[] = 'S';
        // $headings[] = 'A';
        $headings = array_merge($headings, ['H', 'I', 'S', 'A']);
        return $headings;
    }

    public function map($data): array
    {
        // dd($data);
        $start = Carbon::parse($this->tgl)->startOfMonth();
        $end = Carbon::parse($this->tgl)->lastOfMonth();
        $periode = CarbonPeriod::create($start, $end);

        $content = [
            $this->rowNumber++,
            $data->nama, 
            $data->jk == 'Laki-Laki' ? 'L' : 'P', 
        ];

        foreach($periode as $p){
            $status = AbsenDetail::whereHas('absen', function($q) use($p){
                            return $q->whereDate('tgl', $p);
                        })
                        ->where('anak_id', $data->id)
                        ->first();
            $content[] = $status ? $status->status : '-';
        }

        $content[] = AbsenDetail::where('anak_id', $data->id)->where('status', 'Hadir')->count() ?? 0; // H
        $content[] = AbsenDetail::where('anak_id', $data->id)->where('status', 'Izin')->count() ?? 0; // I
        $content[] = AbsenDetail::where('anak_id', $data->id)->where('status', 'Sakit')->count() ?? 0; // S
        $content[] = AbsenDetail::where('anak_id', $data->id)->where('status', 'Alpa')->count() ?? 0; // A

        return $content;
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {

                $sheet = $event->sheet->getDelegate();

                $highestColumn = chr(64 + $this->headingLength);

                // $sheet->setAutoFilter('A7:'.chr(64 + $this->headingLength) . '7');
                // foreach (range('A', $sheet->getHighestColumn()) as $col) {
                //     $sheet->getColumnDimension($col)->setAutoSize(true);
                // }

                // Merge cells for title
                $sheet->mergeCells('A1:'.$highestColumn.'2');
                $sheet->setCellValue('A1', 'Data Absen');
                $sheet->getStyle('A1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'size' => 16,
                        'color' => ['argb' => 'FFFFFF'],
                    ],
                    'alignment' => [
                        'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                        'vertical' => \PhpOffice\PhpSpreadsheet\Style\Alignment::VERTICAL_CENTER,
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => ['argb' => 'F0B86E'],
                    ],
                ]);

                if($this->kelompok){
                    $kelompok = Kelompok::where('id', $this->kelompok)->first();

                    $sheet->setCellValue('A4', 'Kelompok');
                    $sheet->setCellValue('B4', 'Kelompok '. $kelompok->nama . ' ('. $kelompok->usia .')');
                }
                // Set header styles

                // $sheet->setCellValue('A1', 'Data Anak');

                $sheet->getStyle('A7:'.chr(64 + $this->headingLength) . '7')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'color' => ['argb' => 'FFFFFF'],
                    ],
                    'fill' => [
                        'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                        'startColor' => ['argb' => 'F0B86E'],
                    ],
                ]);
            },
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            7    => ['font' => ['bold' => true]],
        ];
    }

    public function title(): string
    {
        return 'Data Absen';
    }
}

