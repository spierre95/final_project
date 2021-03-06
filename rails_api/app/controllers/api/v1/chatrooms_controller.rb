module Api::V1
  class ChatroomsController < ActionController::API
    def index
      @chatrooms = Chatroom.all
      render json: @chatrooms
    end

    def show
      @chatroom = Chatroom.find(params[:id])
      render json: @chatroom
    end

    def create
      chatroom = Chatroom.new(chatroom_params)
      if chatroom.save
        serialized_data = ActiveModelSerializer::Adapter::Json.new(
          ChatroomSerializer.new(chatroom)
        ).serializable_hash
        ActionCable.server.broadcast 'chatrooms_channel', serialized_data
        head :ok
      end
    end

    def add_to_chatroom
      puts params
      @user = User.find(params[:user_id])
      @chatroom = Chatroom.find(params[:chatroom_id])
      @chatroom.messages.new(content:params[:content], user_id:@user.id)
      @chatroom.save
    end

    private

    def chatroom_params
      params.require(:chatroom).permit(:name)
    end

  end
end
