# à partir d'un array de prix, quel sont les meilleurs jours :
#   - d'achat
#   - de revente pour faire le maximum de bénéfices
# Impossible de vendre avant d'avoir acheté
def get_subtract(buy_v, sell_v)
    return false if (sell_v == nil || buy_v == nil)
    return sell_v - buy_v
end

def day_trader(prices_arr)
    return false if !prices_arr.is_a? Array

    buy_k, buy_v, sell_k, sell_v = nil
    subtract = 0

    res = prices_arr.map.with_index { |v,k|
        buy_k = k, buy_v = v if (k == 0)
        sell_k = k, sell_v = v if (k == 1)

        if (k > 0) && (get_subtract(buy_v, sell_v) != false) && (get_subtract(buy_v, sell_v) > subtract)
            buy_k = k, buy_v = v
            subtract = get_subtract(buy_v, sell_v)
        end
        v
    }
    print "\nbuy_k:#{buy_k} - buy_v:#{buy_v} - sell_k:#{sell_k} - sell_v:#{sell_v} - subtract:#{subtract}\n\n"
    p res
end

day_trader([17, 3, 6, 9, 15, 8, 6, 1, 10])