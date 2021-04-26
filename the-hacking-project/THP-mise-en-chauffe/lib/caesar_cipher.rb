def caesar_cipher_convert(str, key)
    num_min = 32
    num_max = 126
    dec = str.ord
    dec += key if str.ord != 32
    res = dec.chr
    res = ((dec - num_max) + num_min - 1).chr if dec > num_max
    return res
end

def caesar_cipher(str, key)
    return "la clé doit être un entier !" if !key.is_a? Integer
    return "la clé doit être supérieure à 0 !" if (0 >= key)

    return str.split(//).map {|i|
        caesar_cipher_convert(i, key)
    }.join
end

caesar_cipher("What a string!", 5)