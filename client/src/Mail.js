export let Mail= () => {
    Email.send({
        SecureToken: "d83897d2-a739-44df-8dda-7c3cb9a4bc07",
        To: "abhishekverma0203@gmail.com",
        From: "recordspolice5@gmail.com",
        Subject: "This is the subject",
        Body: "And this is the body",
      }).then((message) => alert(message));
}