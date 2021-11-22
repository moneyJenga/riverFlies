newFile = ""

with open("minterABIMoonriver.js", "r") as infile:
    for l in infile.readlines():
        newFile += l.rstrip()

with open("minterABI1line.js", "w") as outfile: 
    outfile.write(newFile)