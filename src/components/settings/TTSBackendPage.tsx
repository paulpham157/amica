import { useTranslation } from 'react-i18next';

import { BasicPage, FormRow, Link, getLinkFromPage } from './common';
import { updateConfig } from "@/utils/config";

const ttsEngines = [
  {key: "none",       label: "None"},
  {key: "elevenlabs", label: "ElevenLabs"},
  {key: "speecht5",   label: "SpeechT5"},
  {key: "openai_tts", label: "OpenAI TTS"},
  {key: "localXTTS",  label: "Alltalk TTS"}, // Our local TTS endpoint (XTTS based)
  {key: "piper",      label: "Piper"},
  {key: "coquiLocal", label: "Coqui Local"},
  {key: "kokoro",     label: "Kokoro"},
];

function idToTitle(id: string): string {
  return ttsEngines[ttsEngines.findIndex((engine) => engine.key === id)].label;
}

export function TTSBackendPage({
  ttsBackend,
  setTTSBackend,
  setSettingsUpdated,
  setPage,
  breadcrumbs,
  setBreadcrumbs,
}: {
  ttsBackend: string;
  setTTSBackend: (backend: string) => void;
  setSettingsUpdated: (updated: boolean) => void;
  setPage: (page: string) => void;
  breadcrumbs: Link[];
  setBreadcrumbs: (breadcrumbs: Link[]) => void;
}) {
  const { t } = useTranslation();

  return (
    <BasicPage
      title={t("TTS Backend")}
      description={t("TTS_Backend_desc", "Select the TTS backend to use. By default this is set to our TTS server. Elevenlabs is a paid service with the best voice, but it is free for non-commercial use. SpeechT5 is an open source TTS model. OpenAI TTS is an open source TTS model. Local XTTS is our local TTS endpoint (XTTS based). Piper is a free TTS model. Coqui Local is a free TTS model.")}
    >
      <ul role="list" className="divide-y divide-gray-100 max-w-xs">
        <li className="py-4">
          <FormRow label={t("TTS Backend")}>
            <select
              className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={ttsBackend}
              onChange={(event: React.ChangeEvent<any>) => {
                setTTSBackend(event.target.value);
                updateConfig("tts_backend", event.target.value);
                setSettingsUpdated(true);
              }}
            >
              {ttsEngines.map((engine) => (
                <option key={engine.key} value={engine.key}>{engine.label}</option>
              ))}
            </select>
          </FormRow>
        </li>
        { ["elevenlabs", "speecht5", "openai_tts", "piper", "coquiLocal", "localXTTS", "kokoro"].includes(ttsBackend) && (
          <li className="py-4">
            <FormRow label={`${t("Configure")} ${t(idToTitle(ttsBackend))}`}>
              <button
                type="button"
                className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  setPage(`${ttsBackend}_settings`);
                  setBreadcrumbs(breadcrumbs.concat([getLinkFromPage(`${ttsBackend}_settings`)]));
                }}
              >
                {t("Click here to configure")} {t(idToTitle(ttsBackend))}
              </button>
            </FormRow>
          </li>
        )}
      </ul>
    </BasicPage>
  );
}
