# frozen_string_literal: true

class Api::V1::Users::SessionsController < Api::V1::BaseController
  skip_before_action :authenticate_user_using_x_auth_token!, only: :create
  before_action :ensure_not_logged_in!, only: :create

  def create
    user = User.find_for_database_authentication(email: user_params[:email])
    if valid_password?(user)
      sign_in user

      render_json(user: user)
    else
      render_error "Invalid email or password."
    end
  end

  def destroy
    sign_out current_user

    render_json
  end

  private

    def user_params
      params.require(:user).permit(:email, :password)
    end

    def valid_password?(user)
      user.present? && user.valid_password?(user_params[:password])
    end
end
