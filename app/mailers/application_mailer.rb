# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "from@example.com"
  default template_path: -> { "mailers/#{self.class.name.underscore}" }
  layout "mailer"
end
