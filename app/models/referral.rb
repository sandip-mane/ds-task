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
end
