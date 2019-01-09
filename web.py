# import libraries
import sys
import urllib.request
from bs4 import BeautifulSoup

quote_page = 'http://menu.dining.ucla.edu/Menus'
page = urllib.request.urlopen(quote_page)
soup = BeautifulSoup(page, 'html.parser')

# menu = soup.find_all(attrs={"class": "recipelink"})

# for item in menu:
# 	print(item.string)
menu_block=soup.find_all(attrs={"class": "menu-block half-col"})

items = []
for menu in menu_block:
	items.append(menu.find(attrs={"class": "col-header"}).string)
	temp = menu.find_all(attrs={"class": "recipelink"})
	for item in temp:
		items.append(item.string)
		
sys.argv[1]=item
print(items)
sys.stdout.flush()



# 	print("menu splitter")
# 	for tag in menu.find_all(True):
# 		print(tag.name)

