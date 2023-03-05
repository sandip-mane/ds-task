# frozen_string_literal: true

require "test_helper"

class Api::V1::ReferralsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create :user
    create :referral, user: @user
  end

  def test_that_index_does_not_work_without_auth
    get api_v1_referrals_url
    assert_response :unauthorized
  end

  def test_that_index_works_with_session
    sign_in @user
    get api_v1_referrals_url
    assert_response :success

    assert_equal 1, json_body["referrals"].count
  end

  def test_that_index_works_with_token
    get api_v1_referrals_url, headers: auth_headers(@user)
    assert_response :success

    assert_equal 1, json_body["referrals"].count
  end

  def test_that_create_works
    payload = {
      referral: {
        email: "some-random-123@example.com"
      }
    }
    post api_v1_referrals_url(payload), headers: auth_headers(@user)
    assert_response :success

    assert_not_nil json_body["referral"]
  end

  def test_that_create_does_not_work_for_taken_emails
    payload = {
      referral: {
        email: @user.referrals.first.email
      }
    }
    post api_v1_referrals_url(payload), headers: auth_headers(@user)
    assert_response :unprocessable_entity

    assert_equal "Email has already been referred", json_body["error"]
  end

  def test_that_create_does_not_work_for_user_emails
    user_2 = create :user
    payload = {
      referral: {
        email: user_2.email
      }
    }
    post api_v1_referrals_url(payload), headers: auth_headers(@user)
    assert_response :unprocessable_entity

    assert_equal "An user with this email already exists", json_body["error"]
  end
end
