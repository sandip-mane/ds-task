# frozen_string_literal: true

require "test_helper"

class Api::V1::Users::RegistrationsControllerTest < ActionDispatch::IntegrationTest
  def test_that_registrations_are_successful
    payload = {
      user: {
        first_name: "John",
        last_name: "Doe",
        email: "john.unique.doe.1@example.com",
        password: "welcome"
      }
    }
    post user_registration_url(payload)
    assert_response :success
    assert_not_nil json_body["user"]
  end

  def test_that_referral_is_accepted_after_signup
    referral = create :referral
    payload = {
      user: {
        first_name: "John",
        last_name: "Doe",
        email: referral.email,
        password: "welcome"
      }
    }

    assert_not referral.accepted?

    post user_registration_url(payload)
    assert_response :success

    referral.reload
    assert referral.accepted?
  end

  def test_that_logged_in_user_cannot_register
    user = create :user
    sign_in user

    payload = {
      user: {
        first_name: "John",
        last_name: "Doe",
        email: user.email,
        password: "welcome"
      }
    }

    post user_registration_url(payload)
    assert_response :unprocessable_entity
    assert_equal "You are already logged in!", json_body["error"]
  end
end
