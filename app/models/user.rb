# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  validates :first_name, :last_name, presence: true

  before_save :ensure_authentication_token_is_present

  def ensure_authentication_token_is_present
    return if authentication_token.present?

    self.authentication_token = generate_authentication_token
  end

  private

    def generate_authentication_token
      Devise.friendly_token
    end
end
