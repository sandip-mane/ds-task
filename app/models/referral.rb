# frozen_string_literal: true

class Referral < ApplicationRecord
  belongs_to :user

  enum state: {
    sent: 0,
    accepted: 1
  }

  validate :ensure_that_existing_users_cannot_be_referred!
  validates :email, uniqueness: {
    message: "has already been referred"
  }, on: :create

  after_create_commit :send_email

  def link_params
    { email: email }
  end

  private

    def ensure_that_existing_users_cannot_be_referred!
      if saved_change_to_email? && email && User.exists?(email: email)
        errors.add :base, "An user with this email already exists"
      end
    end

    def send_email
      ReferralMailer.referral_email(id).deliver_later
    end
end
