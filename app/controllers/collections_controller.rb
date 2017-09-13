class CollectionsController < ApplicationController
    def show
        @user = current_user
        @collection = @user.collection

    end
end
