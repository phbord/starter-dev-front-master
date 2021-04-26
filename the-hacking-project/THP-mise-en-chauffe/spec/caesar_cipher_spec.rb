require_relative '../lib/caesar_cipher'

describe "the caesar cipher convert function" do
    it "is result of character" do
        expect(caesar_cipher_convert("|", 5)).to eq("\"")
        expect(caesar_cipher_convert("A", 1)).to eq("B")
    end
end

describe "the caesar cipher function" do
    it "is result of string" do
        expect(caesar_cipher("What a string!", 5)).to eq("\\mfy f xywnsl&")
    end
end