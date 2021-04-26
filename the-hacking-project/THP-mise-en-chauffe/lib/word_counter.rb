dictionnary = ["below", "down", "go", "going", "horn", "how", "howdy", "it", "i", "low", "own", "part", "partner", "sit"]

def word_counter(word, dictionnary)
    return false if !word.is_a? String

    corpus_words = corpus.split(' ')
    matched_words = []
    corpus_words.each do |corpus_word| 
        matched_a_word = dict.select.with_index do |word|
            # [word,corpus_word]
            corpus_word.downcase.include?(word)
        end
        matched_words.push(matched_a_word)
    end
   
    matched_words = matched_words.flatten
  
    word_frequency = Hash.new(0)
    for i in 0...matched_words.length 
        word_frequency[matched_words[i].to_sym] +=  1
    end
    return word_frequency
    # i = -1
    # res = []
    # hash = Hash[dictionnary.collect { |item| [item, i += 1] }]
    # hash.map() { |s|
    #     if (s.include? (word[2..word.size])) || (s.include? (word))
    #         p s
    #         res.push(s)
    #     end
    # }
    # puts "-------"
    # p res
end

word_counter("below", dictionnary) #=> {"below"=>1, "low"=>1}
puts "---------------------------"
#word_counter("Howdy partner, sit down! How's it going?", dictionnary) #=> {"down"=>1, "how"=>2, "howdy"=>1,"go"=>1, "going"=>1, "it"=>2, "i"=> 3, "own"=>1,"part"=>1,"partner"=>1,"sit"=>1}