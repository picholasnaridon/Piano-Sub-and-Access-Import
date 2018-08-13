
// // $('.sectionTwo').hide()
// // $('.sectionThree').hide()

// $('.upload-btn').on('click', function () {
//   $('#upload-input').click();
//   console.log("test")
//   $('.progress-bar').text('0%');
//   $('.progress-bar').width('0%');
// });


// $('#upload-input').on('change', function () {
//   var uploadedFile = ''
//   var files = $(this).get(0).files;
//   if (files.length > 0) {

//     var formData = new FormData();
//     for (var i = 0; i < files.length; i++) {
//       var file = files[i];
//       formData.append('uploads[]', file, file.name);
//     }

//     $.ajax({
//       url: '/upload',
//       type: 'POST',
//       data: formData,
//       processData: false,
//       contentType: false,
//       success: function (data) {
//         uploadedFile = data
//         console.log('upload successful!\n' + data);
//       },
//     });

//   }
// });

// $('#applyAccess').click(function (e) {
//   console.log(uploadedFile)
//   // e.preventDefault()
//   // $.ajax({
//   //   method: "post",
//   //   url: "/grant",
//   //   data: { uploadedFile: uploadedFile, "rid": 1 },
//   //   success: function (res) {
//   //     console.log(res)
//   //   }
//   // })
// })
