const app = angular.module("posterizationApp", []);

app.controller('controller', function ($scope) {

    $scope.color1R = 0;
    $scope.color1G = 0;
    $scope.color1B = 0;
    $scope.color2R = 255;
    $scope.color2G = 255;
    $scope.color2B = 255;

    $scope.filter = function () {
        let canvas = $("#canvas").get(0);
        let img = $("#img").get(0);
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        let context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
        let imagedata = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight);

        for (let i = 0, n = imagedata.data.length; i < n; i += 4) {
            let sum = imagedata.data[i] + imagedata.data[i + 1] + imagedata.data[i + 2];

            if (sum >= 510) {
                imagedata.data[i] = $scope.color1R;
                imagedata.data[i + 1] = $scope.color1G;
                imagedata.data[i + 2] = $scope.color1B;
            } else if (sum <= 255) {
                imagedata.data[i] = $scope.color2R;
                imagedata.data[i + 1] = $scope.color2G;
                imagedata.data[i + 2] = $scope.color2B;
            } else {
                if ($scope.color2R >= $scope.color1R) {
                    imagedata.data[i] = $scope.color1R+($scope.color2R-$scope.color1R)/2;
                } else {
                    imagedata.data[i] = $scope.color2R+($scope.color1R-$scope.color2R)/2;
                }

                if ($scope.color2G >= $scope.color1G) {
                    imagedata.data[i+1] = $scope.color1G+($scope.color2G-$scope.color1G)/2;
                } else {
                    imagedata.data[i+1] = $scope.color2G+($scope.color1G-$scope.color2G)/2;
                }

                if ($scope.color2B >= $scope.color1B) {
                    imagedata.data[i+2] = $scope.color1B+($scope.color2B-$scope.color1B)/2;
                } else {
                    imagedata.data[i+2] = $scope.color2B+($scope.color1B-$scope.color2B)/2;
                }
            }
        }
        context.putImageData(imagedata, 0, 0)
    };

    $scope.choose = function () {

        const preview = document.querySelector('.mainimg');
        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            preview.src = reader.result;
            let canvas = $("#canvas").get(0);
            let img = $("#img").get(0);
            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;
            let context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    };

    $scope.changeimg = function (imgsrc) {
        const preview = document.querySelector('.mainimg');
        preview.src = imgsrc;
        let canvas = $("#canvas").get(0);
        let img = $("#img").get(0);
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        let context = canvas.getContext('2d');
        context.drawImage(img, 0, 0);
    };

});