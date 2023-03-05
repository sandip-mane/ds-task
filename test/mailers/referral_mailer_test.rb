# frozen_string_literal: true

require "test_helper"

class ReferralMailerTest < ActionMailer::TestCase
  def test_referral_email
    referral = create :referral
    email = ReferralMailer.referral_email(referral.id).deliver_now

    assert_not ActionMailer::Base.deliveries.empty?
    assert_equal ["from@example.com"], email.from
    assert_equal [referral.email], email.to
    assert_includes email.subject, "You've been referred!"
  end
end
