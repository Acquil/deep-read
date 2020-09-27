
#pip install opencv-python
import cv2 
import os 

video_path = "/media/ashwin/Current/sem_9/open_source/my_work/videoplayback.mp4"
render_path = "./data"

# Read the video from specified path 
cap = cv2.VideoCapture(video_path) 
fps = cap.get(cv2.CAP_PROP_FPS)
print(fps)
try: 
      
    # creating a folder named data 
    if not os.path.exists(render_path): 
        os.makedirs(render_path) 
  
# if not created then raise error 
except OSError: 
    print ('Error: Creating directory') 
  

current_frame = 0
  
while(True): 
      
    ret, frame = cap.read()

    if ret:
        cv2.imwrite(render_path + '/frame' + str(current_frame) + '.jpg', frame)
        current_frame += (fps*10) #this advances 10 seconds
        cap.set(1, current_frame)
    else:
        cap.release()
        break

    if current_frame % (fps * 300) == 0:
        print("Completed extracting ", current_frame / (fps * 60), " minutes of video")
  
# Release all space and windows once done 
cap.release() 
cv2.destroyAllWindows() 