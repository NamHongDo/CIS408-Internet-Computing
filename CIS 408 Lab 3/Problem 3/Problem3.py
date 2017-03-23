from lxml import html
import requests
import HTML


page = requests.get('http://cis.csuohio.edu/~sschung/CIS408/InfoUnionAddressJefferson.html'  )
tree = html.fromstring(page.content)

name = tree.xpath('//a/text()')
link = tree.xpath('//a/@href')
newlist = name[4:]
newLink = link[3:]

nameList=[]

for num in range(19):
    nameList.append(newlist[num].split("("))

for i in range (19):
    nameList[i].append(newLink[i])

htmlcode = HTML.table(nameList)
Html_file=open("lab3.html","w")
Html_file.write(htmlcode)
Html_file.close()
