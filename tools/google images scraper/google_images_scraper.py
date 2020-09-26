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


# Main Program which will do all job on its own
if __name__ == "__main__":
    #search=input("Whose Images do you want to download?\n->")
    search_query = "test"
    number_of_downloads = 10
    images=GoogleImagesDownload(search_query)
    searchUrl = images.build_SearchUrl()
    
    