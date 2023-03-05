# frozen_string_literal: true

class ReferralMailer < ApplicationMailer
  def referral_email(id)
    @referral = Referral.find(id)

    mail(to: @referral.email, subject: "You've been referred!")
  end
end
