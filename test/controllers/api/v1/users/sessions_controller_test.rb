# frozen_string_literal: true

require "test_helper"

class Api::V1::Users::SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create :user
  end

  def test_that_session_create_is_successful
    payload = {
      user: {
        email: @user.email,
        password: "welcome"
      }
    }
    post user_session_url(payload)
    assert_response :success
    assert_not_nil json_body["user"]
  end

  def test_that_logged_in_user_cannot_create_session
    sign_in @user

    payload = {
      user: {
        email: @user.email,
        password: "welcome"
      }
    }
    post user_session_url(payload)
    assert_response :unprocessable_entity
    assert_equal "You are already logged in!", json_body["error"]
  end

  def test_that_session_create_does_not_work_with_invalid_password
    payload = {
      user: {
        email: @user.email,
        password: "WRONG_PASSWORD"
      }
    }
    post user_session_url(payload)
    assert_response :unprocessable_entity
    assert_equal "Invalid email or password.", json_body["error"]
  end

  def test_that_session_create_does_not_work_with_invalid_email
    payload = {
      user: {
        email: "invalid_email",
        password: "welcome"
      }
    }
    post user_session_url(payload)
    assert_response :unprocessable_entity
    assert_equal "Invalid email or password.", json_body["error"]
  end

  def test_that_destroy_session_works
    sign_in @user

    delete destroy_user_session_url
    assert_response :success
  end

  def test_that_destroy_session_does_not_work_for_unauthenticated_calls
    delete destroy_user_session_url
    assert_response :unauthorized
  end
end
