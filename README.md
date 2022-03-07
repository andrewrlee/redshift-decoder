# redshift-decoder
Decodes the message found at the end of the 1973 novel, [Red Shift](https://en.wikipedia.org/wiki/Red_Shift_(novel)) by Alan Garner

> 'I'll teach you Lewis Carroll's code, and we'll use it for your letters. If she can crack this she'll deserve a medal...

_Red Shift p82 (Collins, 1973)_

Lewis Carrol's cypher is also known as the [Vigenère cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher). 

This script uses the [Kasiski Examination](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher#Kasiski_examination) over trigrams, as describe here in the quora answer [here](https://qr.ae/pGakxO) in order to determine the length of the key. 

It then uses the approach [here](http://practicalcryptography.com/cryptanalysis/text-characterisation/chi-squared-statistic/) to determine the most likely keyword:

It splits the phrase into slices corresponding with each of the letters belonging to the keyword. 
It then decodes the slice using each of the 25 possible caeser cipher transformations (A-Z) and calculates the chi^2 score of each of the results of this. 

The letter used for the caesar transformation with the lowest chi^2 score produces the distribution of letters that most matches the distribution of letters in the english language and so is most likely the correct letter for this position of the keyword. 

This is repeated for each position in the keyword to build up the key. 

The text is then decoded using the key.