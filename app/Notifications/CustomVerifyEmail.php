<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Lang;

class CustomVerifyEmail extends VerifyEmail
{

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable) : MailMessage
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject(Lang::get('Verify Email Address'))
            ->markdown('emails.verify_email', [
                'verify_url' => $verificationUrl
            ]);
    }
}
