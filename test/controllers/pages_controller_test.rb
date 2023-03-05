# frozen_string_literal: true

require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  def test_that_the_app_is_rendered
    get root_url
    assert_response :success
  end
end
