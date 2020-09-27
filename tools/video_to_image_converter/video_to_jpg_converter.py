
#pip install opencv-python
import cv2 
import os 

class Video_to_JPG_Converter:

    cap = None
    fps = None

    def __init__(self,video_path, render_path, offset_duration_seconds = 10):
        self.video_path = video_path
        self.render_path = render_path
        self.offset_duration_seconds = offset_duration_seconds

    # Read the video from specified path 
    def read_video(self):
        self.cap = cv2.VideoCapture(self.video_path) 
        self.fps = self.cap.get(cv2.CAP_PROP_FPS)
    
    def create_render_path_directory(self):
        try: 
            if not os.path.exists(self.render_path): 
                os.makedirs(self.render_path) 
        except OSError: 
            print ('Error: Creating directory') 
  
    def extract_and_save_images_from_video(self):
        current_frame = 0
        
        while(True): 
            
            ret, frame = self.cap.read()

            if ret:
                cv2.imwrite(self.render_path + '/frame' + str(current_frame) + '.jpg', frame)
                current_frame += (self.fps * self.offset_duration_seconds) #this advances video by offset_duration_seconds
                self.cap.set(1, current_frame)
            else:
                break

            if current_frame % (self.fps * 300) == 0:
                print("Completed extracting ", current_frame / (self.fps * 60), " minutes of video")

    # Release all space and windows once done 
    def release_resources(self):
        self.cap.release() 
        cv2.destroyAllWindows()

    def convert(self):
        self.create_render_path_directory()
        self.read_video()
        self.extract_and_save_images_from_video()
        self.release_resources


# #pip install opencv-python
# import cv2 
# import os 

# video_path = "/media/ashwin/Current/sem_9/open_source/my_work/videoplayback.mp4"
# render_path = "./data"
# offset_duration_seconds = 10
# # Read the video from specified path 
# cap = cv2.VideoCapture(video_path) 
# fps = cap.get(cv2.CAP_PROP_FPS)
# print(fps)
# try: 
      
#     # creating a folder named data 
#     if not os.path.exists(render_path): 
#         os.makedirs(render_path) 
  
# # if not created then raise error 
# except OSError: 
#     print ('Error: Creating directory') 
  

# current_frame = 0
  
# while(True): 
      
#     ret, frame = cap.read()

#     if ret:
#         cv2.imwrite(render_path + '/frame' + str(current_frame) + '.jpg', frame)
#         current_frame += (fps * offset_duration_seconds) #this advances 10 seconds
#         cap.set(1, current_frame)
#     else:
#         cap.release()
#         break

#     if current_frame % (fps * 300) == 0:
#         print("Completed extracting ", current_frame / (fps * 60), " minutes of video")
  
# # Release all space and windows once done 
# cap.release() 
# cv2.destroyAllWindows() 