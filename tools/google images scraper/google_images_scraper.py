"""
	The function of the tool function: scrape google image for a given query
    search_query: Query to search
    number_of_downloads: Number of images to scrape 

"""

from selenium import webdriver
import requests
import chromedriver_binary
from tqdm import tqdm
import os
import re
import sys


class GoogleImagesDownload:
    def __init__(self,search):
        self.url = "https://www.google.co.in/search?hl=en&tbm=isch&source=hp&biw=1600&bih=789&ei=75vUXuyBKLmb4-EP-rGciAE&q="
        self.search=str(search)

    # Build Search Url
    def build_SearchUrl(self):
        for i in self.search.split():
            self.url = self.url + i + "+"
        self.url = self.url[:len(self.url) - 1]
        return self.url

    # Download Page Source For Downloading Images
    def downloadPageSource(self,searchUrl,chromeDriverPath="chromedriver"):
        try:
            driver=webdriver.Chrome(chromeDriverPath)
        except Exception as e:
            print("Chromedriver path can't be located or Google Chrome browser is not installed on your machine (Exception: {})".format(e))
            sys.exit()

        try:
            driver.get(searchUrl)
            pageSource = driver.page_source
            return pageSource
        except Exception as e:
            print("Invalid Url")
            print("No Page Source is returned")
            sys.exit()

     # Extracting All Images Url
    def find_ImagesUrl(self,pageSource):
        all_urls = re.findall(r'"https://.*?"', pageSource)
        img_links = []
        for i in all_urls:
            if "encrypted" in i:
                if "\\u003d" not in i:
                    img_links.append(i)
            elif ".jpg" in i:
                img_links.append(i)
            elif ".png" in i:
                img_links.append(i)
            elif ".gif" in i:
                img_links.append(i)
            elif ".bmp" in i:
                img_links.append(i)
            elif ".svg" in i:
                img_links.append(i)
            elif ".webp" in i:
                img_links.append(i)
        img_links = [i for i in map(lambda link: re.sub(r'"', "", link), img_links)]
        img_links = img_links[::-1]
        return img_links


if __name__ == "__main__":
    #search=input("Whose Images do you want to download?\n->")
    search_query = "test"
    number_of_downloads = 10
    images=GoogleImagesDownload(search_query)
    searchUrl = images.build_SearchUrl()
    html = images.downloadPageSource(searchUrl)
    img_links = images.find_ImagesUrl(html)



    
    