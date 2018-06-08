module Api::V1
  class EventsController < ActionController::API

    def index
      @events = Event.all
      render json: @events
    end

    def create

      @event = Event.new(trip_params)

      @event.save

    end

    private

    def event_params
     params.require(:event).permit(:name, :date, :start_time, :end_time, :image_url)
    end

  end
end