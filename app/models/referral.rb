# frozen_string_literal: true

class Referral < ApplicationRecord
  belongs_to :user

  enum state: {
    sent: 0,
    accepted: 1
  }

  validates :email, uniqueness: {
    scope: :user,
    message: "has already been referred"
  }

  after_create_commit :send_email

  def link_params
    { email: email }
  end

  private

    def send_email
      ReferralMailer.referral_email(id).deliver_later
    end
end
