import shutil
import os 
import random

data = int(input("必要なテストデータの数を入力してください"))

# ディレクトリを作成
try:
    os.mkdir('./images/train_data')
    os.mkdir('./images/test_data')
except FileExistsError:
    pass

# ディレクトリを除いたすべてのファイルを取得
path = "./images/"
files = os.listdir(path)
image_data = [f for f in files if os.path.isfile(os.path.join(path, f))]

# テストデータの初期化
test_data = []

leng = len(image_data)

# 指定した数のテストデータをランダムで取得しtest_dataディレクトリに移動
for x in range(data):
    num = random.randint(0, leng)
    if not image_data[num]:
        continue
    else:
        test_data.append(image_data[num])
        image_data.remove(image_data[num])
        leng = leng - 1

    shutil.move(f'./images/{test_data[x]}', f'./images/test_data/{test_data[x]}')

    if len(test_data) == data:
        break
    else: 
        continue
