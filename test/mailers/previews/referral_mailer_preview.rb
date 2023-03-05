# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/referral_mailer
class ReferralMailerPreview < ActionMailer::Preview
  def referral_email
    ReferralMailer.referral_email(Referral.first.id)
  end
end
