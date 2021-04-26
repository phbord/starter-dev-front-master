Dir.chdir(File.dirname(__FILE__))
shakespeare_file = File.open("shakespeare.txt")
shakespeare_data = shakespeare_file.read 
banned_word_file = File.open("banned_word.txt")
banned_word_data = banned_word_file.read


def word_counter(corpus,dict)
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
end

p word_counter(shakespeare_data,banned_word_data.split(' ') )