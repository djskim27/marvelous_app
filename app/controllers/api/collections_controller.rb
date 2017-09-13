class Api::CollectionsController < ApplicationController

    def create
        @user = current_user
        @user.collection = Collection.create()
    end
end
