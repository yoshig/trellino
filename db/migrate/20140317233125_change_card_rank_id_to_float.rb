class ChangeCardRankIdToFloat < ActiveRecord::Migration
  def change
    change_column :cards, :rank, :float
  end
end
