# frozen_string_literal: true

require "test_helper"

class ReferralTest < ActiveSupport::TestCase
  def test_that_the_referral_is_valid
    referral = build :referral
    assert referral.valid?
  end

  def test_that_existing_users_cannot_be_referred
    user = create :user
    referral = build :referral, email: user.email
    assert_not referral.valid?
    assert_includes referral.errors.full_messages, "An user with this email already exists"
  end

  def test_that_already_referred_user_cannot_be_referred
    referral = create :referral
    referral_2 = build :referral, email: referral.email
    assert_not referral_2.valid?
    assert_includes referral_2.errors.full_messages, "Email has already been referred"
  end

  def test_that_email_is_sent_after_create
    assert_emails 1 do
      create :referral
    end
  end
end
