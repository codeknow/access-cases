export class Speaker {

  public a_speaker_id: string;
  public speaker_bio: string;
  public speaker_name_first: string;
  public speaker_name_last: string;
  public speaker_photo: string;

  public speaker_time: {
    speaker_first_created: string,
    speaker_first_created_time: string,
    speaker_last_edited: string,
    speaker_last_edited_time: string
  };
  public speaker_uid: string;

  //
  constructor(
    a_speaker_id: string,
    speaker_bio: string,
    speaker_name_first: string,
    speaker_name_last: string,
    speaker_photo: string,
    speaker_time: {
      speaker_first_created: string,
      speaker_first_created_time: string,
      speaker_last_edited: string,
      speaker_last_edited_time: string
    },
    speaker_uid: string
  ) {

    this.a_speaker_id = a_speaker_id.toLocaleUpperCase();
    this.speaker_bio = speaker_bio;
    this.speaker_name_first = speaker_name_first;
    this.speaker_name_last = speaker_name_last;
    this.speaker_photo = speaker_photo;

    this.speaker_time = speaker_time;
    this.speaker_uid = speaker_uid;
  }

}
