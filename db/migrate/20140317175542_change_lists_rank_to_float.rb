class ChangeListsRankToFloat < ActiveRecord::Migration
  def change
    change_column :lists, :rank, :float
  end
end
