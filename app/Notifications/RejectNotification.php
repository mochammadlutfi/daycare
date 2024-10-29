<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RejectNotification extends Notification
{
    use Queueable;
    private $anak;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        
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
            ->subject('Status Pendaftaran Daycare Baiturrahmah')
            ->greeting('Halo!')
            ->line('Terima kasih telah mendaftarkan anak Anda ke daycare kami.  
            Kami ingin menginformasikan bahwa pendaftaran anak Anda saat ini tidak dapat kami terima dikarenakan terdapat kesalahan pengisian pada formulir pendaftaran.')
            ->line('Kami menyarankan untuk memeriksa kembali informasi yang telah diisikan dan melakukan perbaikan yang diperlukan. Apabila Bapak/Ibu memerlukan bantuan lebih lanjut atau memiliki pertanyaan, jangan ragu untuk menghubungi kami melalui link berikut')
            ->action('Hubungi Sekarang', 'https://api.whatsapp.com/send?phone=6287868879678&text=')
            ->line('Terima kasih atas pengertiannya.');
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
