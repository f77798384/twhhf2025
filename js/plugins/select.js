
function option1() {
    $gameScreen.showPicture(1, "selected", 0, 0, 0, 50, 50, 255, 0);
    $gameScreen.showPicture(2, "baby_india_girl", 0, 0, 0, 50, 50, 255, 0);
    if ($gameSwitches.value(1) == true) {
        if (Input.isPressed("down")) {
            $gameMessage.add("down");
            $gameMessage.add("非本國籍");
            $gameSwitches.setValue(1, false);
            $gameSwitches.setValue(2, true);
            $gameScreen.erasePicture(1);
        } else if (Input.isPressed("up")) {
            $gameMessage.add("up");
            $gameMessage.add("非本國籍");
            $gameSwitches.setValue(1, false);
            $gameSwitches.setValue(2, true);
            $gameScreen.erasePicture(1);
        } else if (Input.isPressed("left")) {
            $gameMessage.add("left");
            $gameMessage.add("非本國籍");
            $gameSwitches.setValue(1, false);
            $gameSwitches.setValue(2, true);
            $gameScreen.erasePicture(1);
        } else if (Input.isPressed("right")) {
            $gameMessage.add("right");
            $gameMessage.add("非本國籍");
            $gameSwitches.setValue(1, false);
            $gameSwitches.setValue(2, true);
            $gameScreen.erasePicture(1);
        }
    }
    $gameTimer.start(1)
}
function option2() {
    $gameScreen.showPicture(1, "selected", 0, 200, 200, 50, 50, 255, 0);
    $gameScreen.showPicture(3, "baby_asia_girl", 0, 200, 200, 50, 50, 255, 0);
    if ($gameSwitches.value(2) == true) {
        if (Input.isPressed("down")) {
            $gameMessage.add("down");
            $gameMessage.add("本國籍");
            $gameSwitches.setValue(1, true);
            $gameSwitches.setValue(2, false);
            $gameScreen.erasePicture(1);
        } else if (Input.isPressed("up")) {
            $gameMessage.add("up");
            $gameMessage.add("本國籍");
            $gameSwitches.setValue(1, true);
            $gameSwitches.setValue(2, false);
            $gameScreen.erasePicture(1);
        } else if (Input.isPressed("left")) {
            $gameMessage.add("left");
            $gameMessage.add("本國籍");
            $gameSwitches.setValue(1, true);
            $gameSwitches.setValue(2, false);
            $gameScreen.erasePicture(1);
        } else if (Input.isPressed("right")) {
            $gameMessage.add("right");
            $gameMessage.add("本國籍");
            $gameSwitches.setValue(1, true);
            $gameSwitches.setValue(2, false);
            $gameScreen.erasePicture(1);
        }
    }
    $gameTimer.start(1)
}

function picswitch(sw1, pictureid1, picturename1, x1, y1, scx, scy, sw2, pictureid2, picturename2, x2, y2) {
    let direction = $gamePlayer.getInputDirection();
    if ($gameSwitches.value(sw1)==true && direction > 0) {
        $gameMessage.add(($gameSwitches.value(sw1)==true && direction > 0));
        $gameScreen.showPicture(pictureid1, picturename1, 0, x1, y1, scx, scy, 50, 0);
        $gameScreen.showPicture(pictureid2, picturename2, 0, x2, y2, scx, scy, 255, 0);
        $gameScreen.showPicture(pictureid1 + 2, "selected", 0, x1, y1, scx, scy, 0, 0);
        $gameScreen.showPicture(pictureid2 + 2, "selected", 0, x2, y2, scx, scy, 255, 0);
        $gameSwitches.setValue(sw1, false);
        $gameSwitches.setValue(sw2, true);
        $gameMessage.add("本國籍寶寶");
        return
    } else if ($gameSwitches.value(sw2)==true && direction > 0) {
        $gameMessage.add(($gameSwitches.value(sw2)==true && direction > 0));
        $gameScreen.showPicture(pictureid1, picturename1, 0, x1, y1, scx, scy, 255, 0);
        $gameScreen.showPicture(pictureid2, picturename2, 0, x2, y2, scx, scy, 50, 0);
        $gameScreen.showPicture(pictureid1 + 2, "selected", 0, x1, y1, scx, scy, 255, 0);
        $gameScreen.showPicture(pictureid2 + 2, "selected", 0, x2, y2, scx, scy, 0, 0);
        $gameSwitches.setValue(sw1, true);
        $gameSwitches.setValue(sw2, false);
        $gameMessage.add("非本國籍寶寶");
        return
    }
}