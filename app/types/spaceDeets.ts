export interface Kindex {
  index: number;
  valid_time: string;
  analysis_time: string;
}

export interface DstIndex {
  index: string;
  valid_time: string;
}

export interface AuroraAlert {
  start_time: string;
  valid_until: string;
  k_aus: number;
  lat_band: string;
  description: string;
}

interface MagneticFieldData {
  time_tag: string;
  active: boolean;
  source: string;
  range: number | null;
  scale: number | null;
  sensitivity: number | null;
  manual_mode: boolean;
  sample_size: number;
  bt: number;
  bx_gse: number;
  by_gse: number;
  bz_gse: number;
  theta_gse: number;
  phi_gse: number;
  bx_gsm: number;
  by_gsm: number;
  bz_gsm: number;
  theta_gsm: number;
  phi_gsm: number;
  max_telemetry_flag: number;
  max_data_flag: number;
  overall_quality: number;
}

export type MagneticFieldDataResponse = MagneticFieldData[];

export interface AuroraAlertResponse {
  data: AuroraAlert[];
}

export interface KIndexResponse {
  data: Kindex[];
}

export interface DstIndexResponse {
  data: DstIndex[];
}
