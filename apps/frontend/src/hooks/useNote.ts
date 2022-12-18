import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { CreateNoteInput, Note, UpdateNoteInput } from "shared";

import { QueryKeys } from "@/const";
import { api } from "@/services";

interface UseNote {
  createNote: (dto: CreateNoteInput) => Promise<AxiosResponse<Note>>;
  updateNote: (body: {
    id: string;
    dto: UpdateNoteInput;
  }) => Promise<AxiosResponse<Note>>;
  deleteNote: (id: string) => Promise<AxiosResponse<Note>>;
}

export const useNote = (): UseNote => {
  const client = useQueryClient();

  const createMutation = useMutation<
    AxiosResponse<Note>,
    undefined,
    CreateNoteInput
  >({
    mutationFn: (dto) => api.put("note", dto),
  });

  const updateMutation = useMutation<
    AxiosResponse<Note>,
    unknown,
    { id: string; dto: UpdateNoteInput }
  >({
    mutationFn: (arg) => api.patch(`note/${arg.id}`, arg.dto),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QueryKeys.note] });
    },
  });

  const deleteMutation = useMutation<AxiosResponse<Note>, unknown, string>({
    mutationFn: (id) => api.delete(`note/${id}`),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QueryKeys.allNotes] });
    },
  });

  return {
    createNote: createMutation.mutateAsync,
    deleteNote: deleteMutation.mutateAsync,
    updateNote: updateMutation.mutateAsync,
  };
};
