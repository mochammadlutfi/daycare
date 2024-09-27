<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RegisterNotification extends Notification
{
    use Queueable;
    private $invoice;
    private $invoiceFile;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($invoiceFile, $invoice)
    {
        $this->invoice = $invoice;
        $this->invoiceFile = $invoiceFile;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Pendaftaran Daycare Baiturrahmah')
            ->greeting('Halo!')
            ->line('Terima kasih telah mendaftarkan anak Anda ke daycare kami.  
            Kami dengan senang hati menginformasikan bahwa pendaftaran anak anda telah berhasil.')
            ->line('Segera selesaikan proses pembayaran')
            ->line('Kami juga telah melampirkan dokumen invoice untuk referensi Anda.')
            ->attachData($this->invoiceFile, "Invoice ". $this->invoice->nomor ." .pdf", [
                'mime' => 'application/pdf'
            ])
            ->line('Terima kasih atas perhatian dan kerjasamanya.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
