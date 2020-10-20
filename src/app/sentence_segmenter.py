import requests
from os import environ

API_KEY = environ.get('DEEPSEGMENT_API_KEY')

def segment_text(text):
  """
  text : str
  returns if success list of lists
          else text
    """
  max_request_count = 5
  request_count = 0
  data = {"data": [text], "webhook": "https://fastdeploy.requestcatcher.com"}
  response = requests.post('https://tech.notai.tech/deepsegment/en/async', params={'api_key': API_KEY}, json=data).json()
  if response['success']:
    result = requests.post("https://tech.notai.tech/deepsegment/en/result", params={'api_key': API_KEY},json={"unique_id": response['unique_id']}).json()
    while not result['success'] and request_count<=max_request_count:
      request_count += 1
      result = requests.post("https://tech.notai.tech/deepsegment/en/result", params={'api_key': API_KEY},json={"unique_id": response['unique_id']}).json()
    if result['success']:
      return result['prediction']
  return text
