# frozen_string_literal: true

class Api::V1::ReferralsController < Api::V1::BaseController
  def index
    render_json referrals: current_user.referrals.order(created_at: :desc)
  end

  def create
    referral = current_user.referrals.create!(referral_params)

    render_json referral: referral
  end

  private

    def referral_params
      params.require(:referral).permit(:email)
    end
end
