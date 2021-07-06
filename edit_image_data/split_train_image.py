import shutil
import os 

# ディレクトリを除いたすべてのファイルを取得
path = "./images/"
files = os.listdir(path)
image_data = [f for f in files if os.path.isfile(os.path.join(path, f))]

# トレーニングデータを取得し、train_dataディレクトリに移動
leng = len(image_data)
for x in range(leng):
    shutil.move(f'./images/{image_data[x]}', f'./images/train_data/{image_data[x]}')