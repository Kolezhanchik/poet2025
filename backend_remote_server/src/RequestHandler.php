<?php
require('Petition.php');

class RequestHandler
{
    private $data;      // с этими данными работаем
    private $action;    // что делаем
    private $subject;   // с чем делаем

    private $resultStatus;  // статус ответа: всё ок или нет
    private $resultMessage; // комментарий к ответу
    private $resultData;    // данные

    const RESULT_STATUS_GOOD = "OK";
    const RESULT_STATUS_BAD = "NEOK";
    const ACTION_TYPES = array("CREATE", "READ", "DELETE");
    const SUBJECT_TYPES = array("PETITION");

    private function PrepareBadResult($message)
    {
        $this->resultStatus = self::RESULT_STATUS_BAD;
        $this->resultMessage = $message;
    }

    private function PrepareGoodResult($message, $data="")
    {
        $this->resultStatus = self::RESULT_STATUS_GOOD;
        $this->resultMessage = $message;
        $this->resultData = $data;
    }

    public function __construct()
    {
        $this->data = json_decode(stripslashes(file_get_contents("php://input")),true);

        if(!strlen($this->data["ACTION"]))
            $this->PrepareBadResult("Empty action.");
        else if(!strlen($this->data["SUBJECT"]))
            $this->PrepareBadResult("Empty subject.");
        else if(!in_array($this->data["ACTION"],self::ACTION_TYPES))
            $this->PrepareBadResult("Unknown action: {$this->data["ACTION"]}.");
        else if(!in_array($this->data["SUBJECT"],self::SUBJECT_TYPES))
            $this->PrepareBadResult("Unknown subject: {$this->data["SUBJECT"]}.");
        else // тип запроса и субъект распознаны
        {
            $this->action = $this->data["ACTION"];
            $this->subject = $this->data["SUBJECT"];

            switch($this->subject)
            {
                case "PETITION":
                    if($this->action === "CREATE")
                    {
                        $petition = new Petition();
                        $result = $petition->Create($this->data["DATA"]);
                        if($result === true)
                            $this->PrepareGoodResult("Жалоба сохранена.");
                        else
                            $this->PrepareBadResult($result);
                    }
                    else if($this->action === "READ")
                    {
                        $petition = new Petition();
                        $result = $petition->Read($this->data["DATA"]);
                        if($result !== false)
                            $this->PrepareGoodResult("Жалобы загружены.", $result);
                        else
                            $this->PrepareBadResult($result);
                    }
                    else if($this->action === "DELETE")
                    {
                        $petition = new Petition();
                        $result = $petition->Delete($this->data["DATA"]);
                        if($result === true)
                            $this->PrepareGoodResult("Указанная жалоба удалена.", $result);
                        else
                            $this->PrepareBadResult($result);
                    }
                    break;

                default:
                    break;
            }

        }

    }

    public function RenderResponse()
    {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Content-Type");
        header("Access-Control-Allow-Credentials: true");
        header('Content-type: application/json');
        $response = [
            "STATUS" => $this->resultStatus,
            "MESSAGE" => $this->resultMessage,
            "DATA" => $this->resultData
        ];
        echo json_encode($response);
    }




}