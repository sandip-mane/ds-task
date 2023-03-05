# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def test_that_the_user_is_valid
    user = build(:user)
    assert user.valid?
  end

  def test_that_taken_email_cannot_be_used
    victor = create :user, email: "victor@example.com"
    user = build(:user, email: victor.email)
    assert_not user.valid?
  end

  def test_that_names_are_required
    user = build(:user, first_name: nil, last_name: nil)
    assert_not user.valid?
    assert_includes user.errors.full_messages, "First name can't be blank"
    assert_includes user.errors.full_messages, "Last name can't be blank"
  end

  def test_name
    user = build(:user, first_name: nil, last_name: nil)
    assert_not_nil user.name
  end
end
