# frozen_string_literal: true

class Api::V1::Users::RegistrationsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!, only: :create
  before_action :ensure_not_logged_in!, only: :create

  def create
    user = User.create!(user_params)
    mark_referrel_accepted!

    sign_in user
    render_json(user: user)
  end

  private

    def user_params
      params.require(:user).permit(:email, :password, :first_name, :last_name)
    end

    def mark_referrel_accepted!
      referral = Referral.find_by(email: user_params[:email])
      referral.accepted! if referral
    end
end
