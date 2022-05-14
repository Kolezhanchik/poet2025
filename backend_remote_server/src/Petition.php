<?php
require("Database.php");

class Petition
{
    private function ValidateBeforeCreate($data)
    {
        // проверяю только на наличие обязательных полей
        // хорошо бы проверять PUBLIC на Y/N и т.д. но не буду тратить время
        if(!strlen($data["TEXT"]))
            return "Ошибка: текст жалобы не указан.";
        if(!strlen($data["POET"]))
            return "Ошибка: имя поэта не указано.";
        if(!strlen($data["AUTHOR_NAME"]))
            return "Ошибка: имя автора жалобы не указано.";
        if(!strlen($data["AUTHOR_EMAIL"]))
            return "Ошибка: емейл автора жалобы не указан.";
        if(!strlen($data["ADDRESS"]))
            return "Ошибка: адрес не указан.";
        return true;
    }

    // запрос через консоль тестировал, сам вызов метода - нет
    private function CreatePetitionsTable()
    {
        $db = Database::GetConnection();
        $query = "CREATE TABLE `petitions` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `text` text not null, `poet` text not null, `author_name` text not null, `author_email` text not null, `author_tel` text, `address` text not null, `address_extended` text, `address_coordinates` text, `public` text, `timestamp` text not null)";
        $db->exec($query);
        // хорошо бы проверять на ошибки, но не буду тратить время
    }

    public function Create($data)
    {
        $validationResult = $this->ValidateBeforeCreate($data);
        if($validationResult !== true)
        {
            return $validationResult;
        }

        $db = Database::GetConnection();

        $sql = "INSERT INTO petitions (text, poet, author_name, author_email, author_tel, address, address_extended, address_coordinates, public, timestamp) VALUES (:text, :poet, :author_name, :author_email, :author_tel, :address, :address_extended, :address_coordinates, :public, :timestamp)";
        $stmt = $db->prepare($sql);

        $stmt->bindParam(':text',$data["TEXT"]);
        $stmt->bindParam(':poet',$data["POET"]);
        $stmt->bindParam(':author_name',$data["AUTHOR_NAME"]);
        $stmt->bindParam(':author_email',$data["AUTHOR_EMAIL"]);
        $stmt->bindParam(':author_tel',$data["AUTHOR_TEL"]);
        $stmt->bindParam(':address',$data["ADDRESS"]);
        $stmt->bindParam(':address_extended',$data["ADDRESS_EXTENDED"]);
        $stmt->bindParam(':address_coordinates',$data["ADDRESS_COORDINATES"]);
        $stmt->bindParam(':public',$data["PUBLIC"]);
        $stmt->bindParam(':timestamp',strtotime("now"));
        $result = $stmt->execute();
        if($result === false)
        {
            return "Ошибка: Petition::Create failure.";
        }
        $stmt->close();
        return true;
    }

    public function Read($filter)
    {
        $db = Database::GetConnection();
        $query = "SELECT * FROM petitions";
        $limit = intval($filter["LIMIT"]);
        if($filter["SHOW_HIDDEN"] !== "Y")
        {
            $query .= " WHERE public='Y'";
        }
        $query .= " ORDER BY timestamp DESC";
        if($limit > 0)
        {
            $query .= " LIMIT $limit";
        }
        $result = $db->query($query);
        $arPetitions = [];
        while ($row = $result->fetchArray(SQLITE3_ASSOC))
        {
            $row["TIMESTAMP"] = date("d.m.y",$row["TIMESTAMP"]);
            $arPetitions[] = $row;
        }

        return $arPetitions;
    }

    public function Delete($data)
    {
        $db = Database::GetConnection();
        $id = intval($data["ID"]);
        if($id < 1)
        {
            return "Ошибка: ID жалобы не может быть меньше 1";
        }

        $stmt = $db->prepare("DELETE FROM petitions WHERE id = :petition_id");
        $stmt->bindParam(':petition_id', $id);
        $stmt->execute();

        if($db->changes() < 1)
        {
            return "Ошибка: не удалось удалить жалобу с указанным ID";
        }

        return true;
    }
}