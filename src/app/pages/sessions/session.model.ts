export class Session {

  public a_session_id: string;
  public b_speaker_id: string;
  public session_start_date_month: string;
  public session_start_date_day: string;
  public session_start_date_year: string;
  public session_start_time_hour: string;
  public session_start_time_minute: string;
  public session_start_time_midday: string;
  public session_product: string;
  public session_owner_name_first: string;
  public session_owner_name_last: string;
  public session_speaker_name_first: string;
  public session_speaker_name_last: string;
  public session_location_city: string;
  public session_location_state: string;
  public session_location_venue: string;
  public session_title: string;
  public session_uid: string;

  //
  constructor(
    a_session_id: string,
    b_speaker_id: string,
    session_start_date_month: string,
    session_start_date_day: string,
    session_start_date_year: string,
    session_start_time_hour: string,
    session_start_time_minute: string,
    session_start_time_midday: string,
    session_product: string,
    session_owner_name_first: string,
    session_owner_name_last: string,
    session_speaker_name_first: string,
    session_speaker_name_last: string,
    session_location_city: string,
    session_location_state: string,
    session_location_venue: string,
    session_title: string,
    session_uid: string) {

    //
    this.a_session_id = a_session_id;
    this.b_speaker_id = b_speaker_id;
    this.session_start_date_month = session_start_date_month;
    this.session_start_date_day = session_start_date_day;
    this.session_start_date_year = session_start_date_year;

    this.session_start_time_hour = session_start_time_hour;
    this.session_start_time_minute = session_start_time_minute;
    this.session_start_time_midday = session_start_time_midday;

    this.session_product = session_product;
    this.session_owner_name_first = session_owner_name_first;
    this.session_owner_name_last = session_owner_name_last;
    this.session_speaker_name_first = session_speaker_name_first;
    this.session_speaker_name_last = session_speaker_name_last;
    this.session_location_city = session_location_city;
    this.session_location_state = session_location_state;
    this.session_location_venue = session_location_venue;
    this.session_title = session_title;
    this.session_uid = session_uid;
  }

}


