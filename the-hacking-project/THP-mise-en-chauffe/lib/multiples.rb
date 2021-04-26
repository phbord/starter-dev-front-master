def is_multiple_of_3_or_5?(current_number)
    return false if !current_number.is_a? Integer
    res = false
    res = true if (current_number.is_a? Integer) && (current_number % 3 == 0 || current_number % 5 == 0)
    return res
end

def sum_of_3_or_5_multiples(final_number)
    err_msg = "Yo ! Je ne prends que les entiers naturels. TG"
    arr = 0
    return err_msg if (!final_number.is_a? Integer)
    return err_msg if (final_number < 0)
    (0...final_number).each do |n|
        if is_multiple_of_3_or_5?(n) == true
            arr += n
        end
    end
    return arr
end

sum_of_3_or_5_multiples(1.55)
sum_of_3_or_5_multiples(-6)
sum_of_3_or_5_multiples("ddd")